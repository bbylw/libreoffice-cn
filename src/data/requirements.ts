/** 系统与构建要求，转述自 LibreOffice/core README 的构建链与运行时基线。 */
export interface RequirementCard {
  id: string
  name: string
  value: string
  note: string
}

export const requirements: RequirementCard[] = [
  {
    id: 'windows',
    name: 'Windows',
    value: 'Windows 10',
    note: '构建环境需要 wsl-as-helper 配合 Visual Studio 2022。',
  },
  {
    id: 'macos',
    name: 'macOS',
    value: 'macOS 11',
    note: '构建使用 macOS 14 配合 Xcode 16.2 或更高版本，取该系统下可用的最新 Xcode。',
  },
  {
    id: 'linux',
    name: 'Linux',
    value: 'RHEL 9 / CentOS 9',
    note: '编译器基线为 GCC 13, 或 Clang 18 配合 libstdc++ 11。',
  },
  {
    id: 'toolchain',
    name: '语言基线',
    value: 'C++23 · JDK 17 · Python 3.11',
    note: 'C++ 基线是 C++23, 可用特性受最低编译器版本约束；许多模块依赖 Java。',
  },
  {
    id: 'mobile',
    name: '移动平台',
    value: 'iOS 14.5 · Android NDK 27',
    note: 'iOS 构建使用 Xcode 12.5 与 iPhone SDK 14.5, Android 使用 SDK 30.0.3。',
  },
  {
    id: 'wasm',
    name: 'WebAssembly',
    value: 'Emscripten · Qt 5.15',
    note: '运行时需要支持 SharedMemory 的浏览器，即线程与原子操作均可用的浏览器。',
  },
]

export const buildEnvLinks = [
  { label: '按平台构建 LibreOffice', href: 'https://wiki.documentfoundation.org/Development/How_to_build' },
  { label: 'LODE 开发环境脚本', href: 'https://wiki.documentfoundation.org/Development/lode' },
  { label: 'Java 依赖模块清单', href: 'https://wiki.documentfoundation.org/Development/Java' },
  { label: 'WASM 构建说明', href: 'https://github.com/LibreOffice/core/blob/master/static/README.wasm.md' },
]
