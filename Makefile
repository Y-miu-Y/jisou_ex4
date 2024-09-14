deploy:
	npm run build
	firebase deploy

test:
	clear
	npm run test