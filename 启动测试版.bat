@echo off
chcp 65001 >nul
setlocal
cd /d "%~dp0"

echo 正在启动 McSTools 测试版...
echo 关闭此窗口将停止开发模式。
echo.

if not exist "node_modules" (
	echo [错误] 未检测到 node_modules，请先在项目目录执行 pnpm install。
	echo.
	pause
	exit /b 1
)

where pnpm >nul 2>nul
if errorlevel 1 (
	echo [错误] 未找到 pnpm，请先安装 pnpm 并确保其已加入 PATH。
	echo.
	pause
	exit /b 1
)

call pnpm run tauri:dev
set "exitCode=%errorlevel%"

if not "%exitCode%"=="0" (
	echo.
	echo [错误] 测试版启动失败，退出代码：%exitCode%
	pause
)

exit /b %exitCode%
