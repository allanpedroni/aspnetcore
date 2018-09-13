echo off
cls
echo .
echo ..........................................................................................
echo Continue apenas depois de fazer o commit no repositorio local
echo ..........................................................................................
echo .
pause
git remote update --prune
git rebase
pause
