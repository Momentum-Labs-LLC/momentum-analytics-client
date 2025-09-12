WEB_PACK_MODE = production
PORT = 5321
CFLAGS = -c -g -D $(WEB_PACK_MODE) $(PORT)

build: 
	npm run build -- --mode=$(WEB_PACK_MODE)

serve:
	npm run serve -- --mode=$(WEB_PACK_MODE) --port=$(PORT)
