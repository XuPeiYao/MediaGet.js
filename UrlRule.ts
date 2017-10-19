module MediaGet {
    export function urlRule(config: { url: RegExp }) {
        return (target: Object) => {
            target['urlRule'] = config.url;
        }
    }
}