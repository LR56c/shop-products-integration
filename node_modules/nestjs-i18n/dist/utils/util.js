"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usingFastify = exports.isNestMiddleware = exports.formatI18nErrors = exports.i18nValidationMessage = exports.i18nValidationErrorFactory = exports.shouldResolve = void 0;
const interfaces_1 = require("../interfaces");
const class_validator_1 = require("class-validator");
function shouldResolve(e) {
    return typeof e === 'function' || e['use'];
}
exports.shouldResolve = shouldResolve;
function validationErrorToI18n(e) {
    return {
        property: e.property,
        value: e.value,
        target: e.target,
        contexts: e.contexts,
        children: e?.children?.map(validationErrorToI18n),
        constraints: !!e.constraints
            ? Object.keys(e.constraints).reduce((result, key) => {
                result[key] = e.constraints[key];
                return result;
            }, {})
            : {},
    };
}
function i18nValidationErrorFactory(errors) {
    return new interfaces_1.I18nValidationException(errors.map((e) => {
        return validationErrorToI18n(e);
    }));
}
exports.i18nValidationErrorFactory = i18nValidationErrorFactory;
function i18nValidationMessage(key, args) {
    return (a) => {
        const { constraints } = a;
        let { value } = a;
        if (typeof value === 'string') {
            value = value.replace(/\|/g, '');
        }
        return `${key}|${JSON.stringify({ value, constraints, ...args })}`;
    };
}
exports.i18nValidationMessage = i18nValidationMessage;
function formatI18nErrors(errors, i18n, options) {
    return errors.map((error) => {
        const limits = (0, class_validator_1.getMetadataStorage)()
            .getTargetValidationMetadatas(error.target.constructor, error.target.constructor.name, true, false)
            .find((meta) => meta.target === error.target.constructor &&
            meta.propertyName === error.property);
        const constraints = Object.assign({}, limits?.constraints);
        error.children = formatI18nErrors(error.children ?? [], i18n, options);
        error.constraints = Object.keys(error.constraints).reduce((result, key) => {
            const [translationKey, argsString] = error.constraints[key].split('|');
            const args = !!argsString ? JSON.parse(argsString) : {};
            result[key] = i18n.translate(translationKey, {
                ...options,
                args: {
                    property: error.property,
                    value: error.value,
                    target: error.target,
                    contexts: error.contexts,
                    constraints: constraints,
                    ...args,
                },
            });
            return result;
        }, {});
        return error;
    });
}
exports.formatI18nErrors = formatI18nErrors;
const isNestMiddleware = (consumer) => {
    return typeof consumer.httpAdapter === 'object';
};
exports.isNestMiddleware = isNestMiddleware;
const usingFastify = (consumer) => {
    return consumer.httpAdapter.constructor.name
        .toLowerCase()
        .startsWith('fastify');
};
exports.usingFastify = usingFastify;
//# sourceMappingURL=util.js.map