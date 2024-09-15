import { dest, series, src } from 'gulp'
import inlinesource from 'gulp-inline-source'
import replace from 'gulp-replace'

const cleanUp = () => {
	return src('./dist/*.html')
		.pipe(replace('<link rel="manifest" href="/manifest.json"/>', ''))
		.pipe(replace('<link rel="icon" href="/favicon.ico"/>', ''))
		.pipe(replace('<link rel="apple-touch-icon" href="/logo192.png"/>', ''))
		.pipe(dest('./dist'))
}

const inlineScriptsAndCSS = () => {
	const regex = /<script.*<\/script>/g
	return src('./dist/*.html')
		.pipe(
			replace(regex, function replace(match, offset, string) {
				const newString = string
					.replace(match, '')
					.replace('</body></html>', match + '</body></html>')
				return newString
			}),
		)
		.pipe(replace('.js"></script>', '.js" inline></script>'))
		.pipe(replace('rel="stylesheet">', 'rel="stylesheet" inline>'))
		.pipe(
			inlinesource({
				compress: false,
				rootpath: './dist',
			}),
		)
		.pipe(dest('./dist'))
}

const renameAssetsPaths = () => {
	return src('./dist/index.html')
		.pipe(replace('assets/', 'files/'))
		.pipe(dest('./dist'))
}

export default series(cleanUp, inlineScriptsAndCSS, renameAssetsPaths)
