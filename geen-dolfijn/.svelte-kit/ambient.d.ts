
// this file is generated — do not edit it


/// <reference types="@sveltejs/kit" />

/**
 * Environment variables [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env`. Like [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private), this module cannot be imported into client-side code. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://svelte.dev/docs/kit/configuration#env) (if configured).
 * 
 * _Unlike_ [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private), the values exported from this module are statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * ```ts
 * import { API_KEY } from '$env/static/private';
 * ```
 * 
 * Note that all environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * 
 * ```
 * MY_FEATURE_FLAG=""
 * ```
 * 
 * You can override `.env` values from the command line like so:
 * 
 * ```bash
 * MY_FEATURE_FLAG="enabled" npm run dev
 * ```
 */
declare module '$env/static/private' {
	export const IMSETTINGS_INTEGRATE_DESKTOP: string;
	export const SHELL: string;
	export const npm_command: string;
	export const SESSION_MANAGER: string;
	export const npm_config_userconfig: string;
	export const COLORTERM: string;
	export const XDG_CONFIG_DIRS: string;
	export const npm_config_cache: string;
	export const XDG_SESSION_PATH: string;
	export const HISTCONTROL: string;
	export const XDG_MENU_PREFIX: string;
	export const TERM_PROGRAM_VERSION: string;
	export const HOSTNAME: string;
	export const HISTSIZE: string;
	export const ICEAUTHORITY: string;
	export const NODE: string;
	export const SSH_AUTH_SOCK: string;
	export const MEMORY_PRESSURE_WRITE: string;
	export const COLOR: string;
	export const npm_config_local_prefix: string;
	export const XMODIFIERS: string;
	export const DESKTOP_SESSION: string;
	export const LC_MONETARY: string;
	export const GTK_RC_FILES: string;
	export const NO_AT_BRIDGE: string;
	export const GDK_CORE_DEVICE_EVENTS: string;
	export const npm_config_globalconfig: string;
	export const GPG_TTY: string;
	export const EDITOR: string;
	export const XDG_SEAT: string;
	export const PWD: string;
	export const XDG_SESSION_DESKTOP: string;
	export const LOGNAME: string;
	export const XDG_SESSION_TYPE: string;
	export const npm_config_init_module: string;
	export const SYSTEMD_EXEC_PID: string;
	export const _: string;
	export const XAUTHORITY: string;
	export const SDL_VIDEO_MINIMIZE_ON_FOCUS_LOSS: string;
	export const VSCODE_GIT_ASKPASS_NODE: string;
	export const XKB_DEFAULT_MODEL: string;
	export const GTK2_RC_FILES: string;
	export const HOME: string;
	export const SSH_ASKPASS: string;
	export const LANG: string;
	export const LS_COLORS: string;
	export const XDG_CURRENT_DESKTOP: string;
	export const npm_package_version: string;
	export const MEMORY_PRESSURE_WATCH: string;
	export const WAYLAND_DISPLAY: string;
	export const GIT_ASKPASS: string;
	export const XDG_SEAT_PATH: string;
	export const INVOCATION_ID: string;
	export const MANAGERPID: string;
	export const IMSETTINGS_MODULE: string;
	export const INIT_CWD: string;
	export const CHROME_DESKTOP: string;
	export const STEAM_FRAME_FORCE_CLOSE: string;
	export const KDE_SESSION_UID: string;
	export const npm_lifecycle_script: string;
	export const MOZ_GMP_PATH: string;
	export const VSCODE_GIT_ASKPASS_EXTRA_ARGS: string;
	export const XKB_DEFAULT_LAYOUT: string;
	export const npm_config_npm_version: string;
	export const XDG_SESSION_CLASS: string;
	export const TERM: string;
	export const npm_package_name: string;
	export const npm_config_prefix: string;
	export const LESSOPEN: string;
	export const USER: string;
	export const VSCODE_GIT_IPC_HANDLE: string;
	export const QT_WAYLAND_RECONNECT: string;
	export const KDE_SESSION_VERSION: string;
	export const PAM_KWALLET5_LOGIN: string;
	export const DISPLAY: string;
	export const npm_lifecycle_event: string;
	export const SHLVL: string;
	export const LC_MEASUREMENT: string;
	export const XDG_VTNR: string;
	export const XDG_SESSION_ID: string;
	export const npm_config_user_agent: string;
	export const npm_execpath: string;
	export const XDG_RUNTIME_DIR: string;
	export const DEBUGINFOD_URLS: string;
	export const npm_package_json: string;
	export const DEBUGINFOD_IMA_CERT_PATH: string;
	export const KDEDIRS: string;
	export const VSCODE_GIT_ASKPASS_MAIN: string;
	export const QT_AUTO_SCREEN_SCALE_FACTOR: string;
	export const JOURNAL_STREAM: string;
	export const XDG_DATA_DIRS: string;
	export const KDE_FULL_SESSION: string;
	export const GDK_BACKEND: string;
	export const npm_config_noproxy: string;
	export const PATH: string;
	export const npm_config_node_gyp: string;
	export const ORIGINAL_XDG_CURRENT_DESKTOP: string;
	export const DBUS_SESSION_BUS_ADDRESS: string;
	export const npm_config_python: string;
	export const npm_config_global_prefix: string;
	export const npm_config_update_notifier: string;
	export const KDE_APPLICATIONS_AS_SCOPE: string;
	export const MAIL: string;
	export const SYSTEMD_SLEEP_FREEZE_USER_SESSIONS: string;
	export const npm_node_execpath: string;
	export const npm_config_engine_strict: string;
	export const OLDPWD: string;
	export const TERM_PROGRAM: string;
	export const NODE_ENV: string;
}

/**
 * Similar to [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private), except that it only includes environment variables that begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Values are replaced statically at build time.
 * 
 * ```ts
 * import { PUBLIC_BASE_URL } from '$env/static/public';
 * ```
 */
declare module '$env/static/public' {
	
}

/**
 * This module provides access to runtime environment variables, as defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/main/packages/adapter-node) (or running [`vite preview`](https://svelte.dev/docs/kit/cli)), this is equivalent to `process.env`. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://svelte.dev/docs/kit/configuration#env) (if configured).
 * 
 * This module cannot be imported into client-side code.
 * 
 * Dynamic environment variables cannot be used during prerendering.
 * 
 * ```ts
 * import { env } from '$env/dynamic/private';
 * console.log(env.DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 * 
 * > In `dev`, `$env/dynamic` always includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 */
declare module '$env/dynamic/private' {
	export const env: {
		IMSETTINGS_INTEGRATE_DESKTOP: string;
		SHELL: string;
		npm_command: string;
		SESSION_MANAGER: string;
		npm_config_userconfig: string;
		COLORTERM: string;
		XDG_CONFIG_DIRS: string;
		npm_config_cache: string;
		XDG_SESSION_PATH: string;
		HISTCONTROL: string;
		XDG_MENU_PREFIX: string;
		TERM_PROGRAM_VERSION: string;
		HOSTNAME: string;
		HISTSIZE: string;
		ICEAUTHORITY: string;
		NODE: string;
		SSH_AUTH_SOCK: string;
		MEMORY_PRESSURE_WRITE: string;
		COLOR: string;
		npm_config_local_prefix: string;
		XMODIFIERS: string;
		DESKTOP_SESSION: string;
		LC_MONETARY: string;
		GTK_RC_FILES: string;
		NO_AT_BRIDGE: string;
		GDK_CORE_DEVICE_EVENTS: string;
		npm_config_globalconfig: string;
		GPG_TTY: string;
		EDITOR: string;
		XDG_SEAT: string;
		PWD: string;
		XDG_SESSION_DESKTOP: string;
		LOGNAME: string;
		XDG_SESSION_TYPE: string;
		npm_config_init_module: string;
		SYSTEMD_EXEC_PID: string;
		_: string;
		XAUTHORITY: string;
		SDL_VIDEO_MINIMIZE_ON_FOCUS_LOSS: string;
		VSCODE_GIT_ASKPASS_NODE: string;
		XKB_DEFAULT_MODEL: string;
		GTK2_RC_FILES: string;
		HOME: string;
		SSH_ASKPASS: string;
		LANG: string;
		LS_COLORS: string;
		XDG_CURRENT_DESKTOP: string;
		npm_package_version: string;
		MEMORY_PRESSURE_WATCH: string;
		WAYLAND_DISPLAY: string;
		GIT_ASKPASS: string;
		XDG_SEAT_PATH: string;
		INVOCATION_ID: string;
		MANAGERPID: string;
		IMSETTINGS_MODULE: string;
		INIT_CWD: string;
		CHROME_DESKTOP: string;
		STEAM_FRAME_FORCE_CLOSE: string;
		KDE_SESSION_UID: string;
		npm_lifecycle_script: string;
		MOZ_GMP_PATH: string;
		VSCODE_GIT_ASKPASS_EXTRA_ARGS: string;
		XKB_DEFAULT_LAYOUT: string;
		npm_config_npm_version: string;
		XDG_SESSION_CLASS: string;
		TERM: string;
		npm_package_name: string;
		npm_config_prefix: string;
		LESSOPEN: string;
		USER: string;
		VSCODE_GIT_IPC_HANDLE: string;
		QT_WAYLAND_RECONNECT: string;
		KDE_SESSION_VERSION: string;
		PAM_KWALLET5_LOGIN: string;
		DISPLAY: string;
		npm_lifecycle_event: string;
		SHLVL: string;
		LC_MEASUREMENT: string;
		XDG_VTNR: string;
		XDG_SESSION_ID: string;
		npm_config_user_agent: string;
		npm_execpath: string;
		XDG_RUNTIME_DIR: string;
		DEBUGINFOD_URLS: string;
		npm_package_json: string;
		DEBUGINFOD_IMA_CERT_PATH: string;
		KDEDIRS: string;
		VSCODE_GIT_ASKPASS_MAIN: string;
		QT_AUTO_SCREEN_SCALE_FACTOR: string;
		JOURNAL_STREAM: string;
		XDG_DATA_DIRS: string;
		KDE_FULL_SESSION: string;
		GDK_BACKEND: string;
		npm_config_noproxy: string;
		PATH: string;
		npm_config_node_gyp: string;
		ORIGINAL_XDG_CURRENT_DESKTOP: string;
		DBUS_SESSION_BUS_ADDRESS: string;
		npm_config_python: string;
		npm_config_global_prefix: string;
		npm_config_update_notifier: string;
		KDE_APPLICATIONS_AS_SCOPE: string;
		MAIL: string;
		SYSTEMD_SLEEP_FREEZE_USER_SESSIONS: string;
		npm_node_execpath: string;
		npm_config_engine_strict: string;
		OLDPWD: string;
		TERM_PROGRAM: string;
		NODE_ENV: string;
		[key: `PUBLIC_${string}`]: undefined;
		[key: `${string}`]: string | undefined;
	}
}

/**
 * Similar to [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private), but only includes variables that begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Note that public dynamic environment variables must all be sent from the server to the client, causing larger network requests — when possible, use `$env/static/public` instead.
 * 
 * Dynamic environment variables cannot be used during prerendering.
 * 
 * ```ts
 * import { env } from '$env/dynamic/public';
 * console.log(env.PUBLIC_DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 */
declare module '$env/dynamic/public' {
	export const env: {
		[key: `PUBLIC_${string}`]: string | undefined;
	}
}
