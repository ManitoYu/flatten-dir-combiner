const fs = require('fs')
const path = require('path')

const readdirPromise = dir => new Promise((resolve, reject) => fs.readdir(dir, (err, files) => err ? reject(err) : resolve(files)))
const statPromise = file => new Promise((resolve, reject) => fs.stat(file, (err, stats) => err ? reject(err) : resolve(stats)))

;(f => f(f))
(g => d =>
  readdirPromise(d)
    .then(files => Promise.all(files.map(f => statPromise(path.join(d, f)).then(s => s.isDirectory() ? g(g)(path.join(d, f)) : [f]))))
    .then(files => files.reduce((a, f) => a.concat(f), []))
)('.')
.then(files => console.log(files))

// ;(f => f(f))(f => t => t().then(() => f(f)(t)))(t)