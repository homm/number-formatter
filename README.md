How To Use
----------

```javascript
> var size = numberFormatter({signs: 3, binary: true, units: 'B kB MB GB TB'.split(' ')})
> size(1024000)
"0.98 MB"
> size(10240000)
"9.77 MB"
> size(102400000)
"97.7 MB"
> size(1024000000)
"977 MB"
> size(10240000000000000)
"9313 TB"
> var size = numberFormatter({signs: 2, binary: true, units: 'B kB MB GB TB'.split(' ')})
> size(1024000)
"1 MB"
> size(10240000)
"9.8 MB"
> size(102400000)
"98 MB"
> size(1024000000)
"977 MB"
```
