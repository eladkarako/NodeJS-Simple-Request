@echo off
::path
set TOOL_NODE=%~dp0node.exe
set TOOL_SCPT=%~dp0index.js

::path - fully qualified normaliser
for /f %%a in ("%TOOL_NODE%")do (set "TOOL_NODE=%%~fsa"  )
for /f %%a in ("%TOOL_SCPT%")do (set "TOOL_SCPT=%%~fsa"  )

call "%TOOL_NODE%" "%TOOL_SCPT%" "%FILE_INPT%"
pause
