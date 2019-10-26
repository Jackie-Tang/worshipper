# 学习强国

运行：
```
npm install electron@3.0.15 
or 
npx electron .
```

打包
```
npm install electron-packager -g
npx electron-packager . 崇拜者 \
    --executable-name="崇拜者" \
    --electron-version="3.0.15" --overwrite --asar --icon="logo.jpeg" \
    --ignore="node_modules" --ignore="package-lock.json"
```
