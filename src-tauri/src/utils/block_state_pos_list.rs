use rayon::iter::IntoParallelRefIterator;
use serde::{Deserialize, Serialize};
use std::collections::BTreeMap;
use std::collections::VecDeque;
use std::sync::Arc;

#[derive(Debug, Clone, Copy, Serialize, Deserialize, PartialEq)]
pub struct BlockPos {
    pub x: i32,
    pub y: i32,
    pub z: i32,
}

impl BlockPos {
    pub fn to_string(&self) -> String {
        format!("{},{},{}", self.x, self.y, self.z)
    }
}
#[derive(Debug, Clone, Hash, Eq, PartialEq, Deserialize)]
pub struct BlockId {
    pub name: Arc<str>,
}

impl serde::Serialize for BlockId {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        serializer.serialize_str(&self.name)
    }
}
#[derive(Debug, Clone, Hash, Eq, PartialEq, Serialize, Deserialize)]
pub struct BlockData {
    pub id: BlockId,
    pub properties: BTreeMap<Arc<str>, Arc<str>>,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
pub struct BlockStatePos {
    pub pos: BlockPos,
    pub block: Arc<BlockData>,
}

#[derive(Debug, Clone, Default, PartialEq, Serialize, Deserialize)]
pub struct BlockStatePosList {
    pub elements: VecDeque<BlockStatePos>,
}

impl BlockStatePos {
    pub fn new(pos: BlockPos, block: Arc<BlockData>) -> Self {
        Self { pos, block }
    }
}

impl BlockStatePosList {
    pub fn add(&mut self, pos: BlockPos, block: Arc<BlockData>) {
        self.elements.push_back(BlockStatePos::new(pos, block));
    }

    pub fn merge(&mut self, other: Self) {
        self.elements.extend(other.elements);
    }

    pub fn reserve_front(&mut self, capacity: usize) {
        self.elements.reserve(capacity);
    }

    pub fn bulk_prepend(&mut self, mut other: VecDeque<BlockStatePos>) {
        other.append(&mut self.elements);
        self.elements = other;
    }

    pub fn add_by_pos(&mut self, x: i32, y: i32, z: i32, block: Arc<BlockData>) {
        self.elements
            .push_back(BlockStatePos::new(BlockPos { x, y, z }, block));
    }

    pub fn add_to_first(&mut self, x: i32, y: i32, z: i32, block: &Arc<BlockData>) {
        self.elements
            .push_front(BlockStatePos::new(BlockPos { x, y, z }, block.clone()));
    }

    pub fn remove(&mut self, target: &BlockStatePos) -> bool {
        if let Some(index) = self.elements.iter().position(|x| x == target) {
            self.elements.remove(index);
            true
        } else {
            false
        }
    }
    pub fn par_iter(&self) -> rayon::collections::vec_deque::Iter<BlockStatePos> {
        self.elements.par_iter()
    }

    pub fn remove_by_index(&mut self, index: usize) -> Option<BlockStatePos> {
        if index < self.elements.len() {
            Some(self.elements.remove(index)?)
        } else {
            None
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    fn block(name: &str) -> Arc<BlockData> {
        Arc::new(BlockData {
            id: BlockId {
                name: Arc::from(name),
            },
            properties: BTreeMap::new(),
        })
    }

    #[test]
    fn maintains_order_when_prepending_and_merging() {
        let stone = block("minecraft:stone");
        let glass = block("minecraft:glass");
        let mut list = BlockStatePosList::default();
        list.add_by_pos(1, 2, 3, stone.clone());
        list.add_to_first(0, 0, 0, &glass);

        let mut other = BlockStatePosList::default();
        other.add_by_pos(4, 5, 6, stone);
        list.merge(other);

        assert_eq!(list.elements.len(), 3);
        assert_eq!(list.elements[0].pos.to_string(), "0,0,0");
        assert_eq!(list.elements[2].pos.to_string(), "4,5,6");
    }

    #[test]
    fn removes_by_value_and_index() {
        let stone = block("minecraft:stone");
        let target = BlockStatePos::new(BlockPos { x: 1, y: 0, z: 0 }, stone.clone());
        let mut list = BlockStatePosList::default();
        list.add_by_pos(0, 0, 0, stone.clone());
        list.add_by_pos(1, 0, 0, stone);

        assert!(list.remove(&target));
        assert!(!list.remove(&target));
        assert!(list.remove_by_index(0).is_some());
        assert!(list.remove_by_index(0).is_none());
    }
}
