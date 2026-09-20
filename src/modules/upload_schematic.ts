import {ref} from "vue";
import {invoke} from "@tauri-apps/api/core";
import {userData} from "./user_data.ts";
import {toast} from "./others.ts";
import {fetch_data} from "./tools_data.ts";

export const files = ref<File[]>([]);
export const uploadStatus = ref<'idle' | 'uploading' | 'success' | 'error'>('idle');
export const uploadError = ref<string | null>(null);
export const progressTimer = ref<number | null>(null)
export const progressValue = ref(100)
export const localSchematicsRefreshVersion = ref(0)

export const markLocalSchematicsDirty = () => {
    localSchematicsRefreshVersion.value += 1
}

export const handleUpload = async (update_id: number) => {
    if (files.value.length === 0) return;

    uploadStatus.value = 'uploading';
    uploadError.value = null;

    
    
    const failures: string[] = [];
    let succeeded = 0;

    try {
        toast.info(`蓝图正在${update_id == -1? '上传': '更新'}解析请勿关闭`, {
            timeout: 2000
        });
        for (const file of files.value) {
            try {
                const arrayBuffer = await file.arrayBuffer();
                const uint8Array = new Uint8Array(arrayBuffer);

                await invoke('encode_uploaded_schematic', {
                    fileName: file.name,
                    data: Array.from(uint8Array),
                    update: update_id != -1,
                    updateId: update_id
                });
                succeeded += 1;
            } catch (err) {
                failures.push(`${file.name}: ${err}`);
                console.error(`蓝图解析失败:${file.name}`, err);
            }
        }
        if (update_id != -1) {
            await fetch_data(update_id)
        }

        if (failures.length > 0) {
            uploadStatus.value = 'error';
            uploadError.value = failures.join('\n');
            toast.error(`有 ${failures.length} 个文件导入失败：\n${failures.join('\n')}`, {
                timeout: 6000
            });
        } else {
            uploadStatus.value = 'success';
            toast.success(`蓝图${update_id == -1? '上传': '更新'}完毕`, {
                timeout: 2000
            });
        }

        if (succeeded > 0) {
            userData.value.schematics += succeeded;
            markLocalSchematicsDirty()
            startProgressTimer()
        }
    } catch (err) {
        uploadStatus.value = 'error';
        uploadError.value = err instanceof Error ? err.message : '文件上传失败';
        startProgressTimer()
        console.error('上传错误:', err);
        toast.error(`发生了一个错误:${err}`, {
            timeout: 3000
        });
    }
};
const startProgressTimer = () => {
    const duration = 2500
    const interval = 50
    const steps = duration / interval
    let currentStep = 0

    progressTimer.value = window.setInterval(() => {
        currentStep++
        progressValue.value = 100 - (currentStep / steps) * 100

        if (currentStep >= steps) {
            uploadStatus.value = 'idle'
            files.value = []
            if (progressTimer.value) {
                window.clearInterval(progressTimer.value)
            }
        }
    }, interval)
}
