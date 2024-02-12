THIS_FILE := $(lastword $(MAKEFILE_LIST))
.PHONY: start

start:
	uvicorn main:app --reload 