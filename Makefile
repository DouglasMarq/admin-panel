dev:
	yarn dev

build: formatCheck
	yarn build

start: build
	yarn start

format:
	yarn format

formatCheck:
	yarn format:check