/**
 * dsh-ui-skin-wave - node half.
 *
 * Pure UI plugin: this empty apply only exists so the package shows up in the
 * host Loader; the browser half ships via exports["./client"] and is discovered
 * through the package.json dsh.client declaration. The package-root
 * cordis.patch.yml self-mounts it (dsh.bundle.patch).
 *
 * The plugin never touches upstream files: the skin is one <style> tag, one
 * fixed <div id="dsh-ocean-fx"> layer and a few body attributes. Removing those
 * restores the stock DSH look exactly.
 */

/** No host services are required (headless/tui profiles load this fine). */
export const inject = [];

export function apply() {}
