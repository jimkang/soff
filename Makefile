include config.mk

HOMEDIR = $(shell pwd)
rollup = ./node_modules/.bin/rollup

deploy:
	npm version patch && make build && git commit -a -m"Build" && make pushall

pushall: sync
	git push origin main

run:
	$(rollup) -c -w

build:
	$(rollup) -c

prettier:
	prettier --single-quote --write "**/*.js"

sync:
	rsync -a $(HOMEDIR)/ $(USER)@$(SERVER):/$(APPDIR) \
    --exclude node_modules/ \
    --exclude samples \
    --exclude narration \
    --exclude uncompressed

sync-samples:
	s3cmd sync --acl-public samples/ s3://$(BUCKET)/sound-of-the-far-future/samples/

sync-narration:
	s3cmd sync --acl-public narration/ s3://$(BUCKET)/sound-of-the-far-future/narration/

set-up-server-dir:
	ssh $(USER)@$(SERVER) "mkdir -p $(APPDIR)"
