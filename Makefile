
build: components index.js
	@component build --dev

components:
	@component install --dev

clean:
	rm -fr build components

test:
	@./node_modules/.bin/mocha \
		--reporter dot \
		--require should

docs:
	@dox --api < index.js | sed 's/proto/Enumerable/'

.PHONY: clean test docs
