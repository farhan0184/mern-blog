export function getChangedProperties(obj1, obj2) {
    const changes = {};

    // Iterate through the keys of both objects
    const keys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);

    keys.forEach(key => {
        if (obj1[key] !== obj2[key]) {
            changes[key] = obj2[key];
        }
    });

    return changes;
}


