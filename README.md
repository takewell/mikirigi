# Mikirigi

A script to request [GitHub graphql API v4](https://developer.github.com/v4/)

## Settings

Set the generated your github access token as an environment variable

`export GITHUB_ACCESS_TOKEN="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"`

## 便利
`$ less ./keyword.json | jq ".packages[].name" | xargs -I {} miki`

