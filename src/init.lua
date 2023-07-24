local Main = require(script.Main)
local Simple = require(script.Simple)
local Version = require(script.Version)

local FormatNumber = {
	FormatNumber = Main;
	Main = Main;
	Simple = Simple;
	Version = Version;
}

return table.freeze(FormatNumber)
