# Live Query Service Plugin (a.k.a. Mini Wallboard)

This plugin add tasks / workers statistic to any Flex view. This plugin uses the [Flex's `insightsClient`](https://www.twilio.com/docs/flex/developer/ui/manager#insightsclient), the [`LiveQuery`](https://media.twiliocdn.com/sdk/js/sync/releases/0.12.2/docs/LiveQuery.html) and [`InstanQuery`](https://media.twiliocdn.com/sdk/js/sync/releases/0.12.2/docs/InstantQuery.html) classes and the [Live Query Language](https://www.twilio.com/docs/sync/live-query) to fetch Tasks / Workers statistic. That means that no backend deployment is needed to make this plugin works.  

![image](https://user-images.githubusercontent.com/54728384/128317707-42859e98-aa91-4559-91a1-5f70de795f3b.png)


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

## Demo

In the demo below you can see how the Tasks status and the available agents counters change during the lifecycle of a task

https://user-images.githubusercontent.com/54728384/128318668-8286fc71-f718-4df3-8178-f5c42aebd7dd.mp4
