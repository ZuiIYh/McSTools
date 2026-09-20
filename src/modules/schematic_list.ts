 





export interface IdentifiedItem {
    id: number
}

export function mergeById<T extends IdentifiedItem>(existing: T[], incoming: T[]): T[] {
    const merged = [...existing]
    const seen = new Set(merged.map((item) => item.id))

    for (const item of incoming) {
        if (seen.has(item.id)) {
            continue
        }
        seen.add(item.id)
        merged.push(item)
    }

    return merged
}
