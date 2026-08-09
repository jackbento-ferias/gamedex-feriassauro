@echo off
title GameDex Feriassauro - Publicar

cd /d D:\Projeto\gamedex-feriassauro

echo.
echo ==========================================
echo       GAMEDEX FERIASSAURO
echo          PUBLICAR ATUALIZACAO
echo ==========================================
echo.

echo [1/3] Verificando alteracoes...
echo.

git status --short

echo.

git diff --quiet
git diff --cached --quiet

REM Verifica tambem arquivos novos
for /f %%A in ('git status --porcelain') do set HAS_CHANGES=1

if not defined HAS_CHANGES (
    echo Nenhuma alteracao detectada.
    echo.
    echo Nada para publicar.
    echo.
    pause
    exit /b
)

echo ==========================================
echo.
echo [2/3] Preparando arquivos...
echo.

git add .

if errorlevel 1 (
    echo.
    echo ERRO ao adicionar os arquivos.
    echo.
    pause
    exit /b 1
)

echo.
echo Criando commit...
echo.

git commit -m "Atualiza GameDex"

if errorlevel 1 (
    echo.
    echo ERRO ao criar o commit.
    echo.
    pause
    exit /b 1
)

echo.
echo [3/3] Enviando para o GitHub...
echo.

git push origin main

if errorlevel 1 (
    echo.
    echo ERRO ao enviar para o GitHub.
    echo.
    pause
    exit /b 1
)

echo.
echo ==========================================
echo       PUBLICACAO CONCLUIDA!
echo ==========================================
echo.
echo A GameDex foi enviada para o GitHub.
echo.
echo O GitHub Pages atualizara o site em alguns
echo instantes.
echo.
echo ==========================================
echo.

pause