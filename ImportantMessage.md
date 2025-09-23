# To anyone wishing to helping with this site:

## deno

This project uses _deno_, not _npm_ to run it. There is a reason `package.json.old` and `package-lock.json.old` are named that. Please install everything with deno. Don't know how? Just run:

```bash
deno i --npm; deno i --jsr;
```

The commands to run the project can all be found in `deno.json` under `tasks`.

Please also run

```bash
deno lint
```

when you are done, and do not forget to format everything.

## nix

There are two files concerning nix-users. If you do not use NixOS, just ignore them, do NOT remove them.

Thank you for your cooperation.
