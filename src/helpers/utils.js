module.exports = {
	setStateAsync: s => new Promise(r => this.setState(s,r)),
	sleep: ms => new Promise(r => setTimeout(r, ms))
}