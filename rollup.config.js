import typescript from 'rollup-plugin-typescript2';

export default {
	plugins: [
		typescript({
      cacheRoot: ".cache"
    })
	]
}
