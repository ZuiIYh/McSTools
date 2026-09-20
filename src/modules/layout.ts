import {ref} from "vue";

export const activeTab = ref('home')

export const navItems = [
    { icon: 'mdi-home-outline', title: '主页', value: 'home' },
    { icon: 'mdi-tools', title: '蓝图工具', value: 'tools' },
    { icon: 'mdi-warehouse', title: '蓝图库', value: 'schematic' },
    { icon: 'mdi-package-variant', title: '工具箱', value: 'others' },
    { icon: 'mdi-palette', title: '个性化', value: 'individuation' },
    { icon: 'mdi-message-alert-outline', title: '问题反馈', value: 'report' },
    { icon: 'mdi-information-outline', title: '关于', value: 'about' },
]
