# Live Query Service Plugin (a.k.a. Mini Wallboard)

This plugin add tasks / workers statistic to any Flex view. 

## Setup

Make sure you have [Node.js](https://nodejs.org) as well as [`npm`](https://npmjs.com). Twilio CLI supports Node >= 10.12 (and recommend the _even_ versions of Node).

1. Install the Twilio CLI following the instruction on the [Twilio CLI Quickstart
](https://www.twilio.com/docs/twilio-cli/quickstart)
2. Install the Flex Plugin CLI following the instructions on the [Install Flex Plugins CLI
](https://www.twilio.com/docs/flex/developer/plugins/cli/install)
3. Install dependencies 
```bash
npm install 
```
4. Select (or add) your Twilio Flex project to the Twilio CLI 
```bash
$ twilio profiles:use
```
5. Deploy the plugin 
```bash 
$ twilio flex:plugins:deploy 
```
6. Follow the instructions provided by the `deploy` command to create a release