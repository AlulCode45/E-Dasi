interface Session {
    key: string;
    isString: boolean;
}

const getSession = ({ key, isString }: Session) => {
    const item = sessionStorage.getItem(key);
    if (item === null) {
        return null;
    }
    if (isString) {
        try {
            return JSON.parse(item);
        } catch (e) {
            console.error("Parsing error on", item);
            return null;
        }
    } else {
        return item;
    }
}

export {
    getSession
}
