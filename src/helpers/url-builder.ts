function prop<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];
}

export function serialize<T>(object: T) {
    const objectProps = Object.keys(object) as [keyof T];

    return objectProps
        .map(key => `${key}=${prop(object, key)}`).join('&');
}

export function makeApiUrl<T>(baseUrl: string, resource: string, queryObject?: T) {
    const url = `${baseUrl}/${resource}`;

    if (queryObject !== undefined) {
        const queryString = serialize(queryObject);
        return `${url}?${queryString}`;
    }

    return url;
}