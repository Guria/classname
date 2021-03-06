const modDelim = '_';
const elemDelim = '__';

export function stringify(props) {
    if (!props) {
        return '';
    }

    // validation
    // istanbul ignore next
    if (process.env.NODE_ENV !== 'production') {
        require('./validate.js').default(props);
    }

    let out = '';

    // block
    if (typeof props.block !== 'undefined') {
        out += (out ? ' ' : '') + props.block;

        // elem
        if (typeof props.elem !== 'undefined') {
            out += elemDelim + props.elem;
        }

        const entity = out;

        if (typeof props.mods !== 'undefined') {
            Object.keys(props.mods).forEach(modName => {
                const modValue = props.mods[modName];
                let modValueString = '';

                if (modValue !== false) {
                    // 'short' boolean mods
                    if (modValue !== true) {
                        modValueString += modDelim + modValue;
                    }

                    out += ' ' + entity + modDelim + modName + modValueString;
                }
            });
        }
    }

    if (typeof props.mix !== 'undefined') {
        // convert object or array into array
        const mixes = [].concat(props.mix);

        mixes
            // filter holes in array
            .filter(mix => mix)
            .forEach(mix => {
                out += (out ? ' ' : '') + stringify(mix);
            });
    }

    if (typeof props.className !== 'undefined') {
        out += (out ? ' ' : '') + props.className;
    }

    return out;
}
