import gulp from 'gulp'
import inline from 'gulp-inline'
import replace from 'gulp-replace'

const { src, series, dest } = gulp

const cleanUp = () => {
	return src('./dist/*.html')
		.pipe(replace('<link rel="manifest" href="/manifest.json"/>', ''))
		.pipe(replace('<link rel="icon" href="/favicon.ico"/>', ''))
		.pipe(replace('<link rel="apple-touch-icon" href="/logo192.png"/>', ''))
		.pipe(dest('./dist'))
}

const inlineScriptsAndCSS = () => {
	return (
		src('./dist/*.html')
			// Adjust paths to be relative (remove leading slashes)
			.pipe(replace(/(src|href)="\/(.*?)"/g, '$1="$2"'))
			// Inline scripts and styles
			.pipe(
				inline({
					base: './dist/',
					disabledTypes: ['svg', 'img'], // Only inline scripts and css
				}),
			)
			.pipe(dest('./dist'))
	)
}

const renameAssetsPaths = () => {
	return src('./dist/index.html')
		.pipe(replace('static/media/', 'files/'))
		.pipe(replace('assets/', 'files/')) // vite
		.pipe(dest('./dist'))
}

export default series(cleanUp, inlineScriptsAndCSS, renameAssetsPaths)
