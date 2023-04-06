const { is, isAny } = require("bpmnlint-utils");

const MAX_NUMBER_OF_ELEMENTS = 50;

/**
 * Rule that reports manual tasks being used.
 */
module.exports = function () {
  function check(node, reporter) {
    if (is(node, "bpmn:Process")) {
      if (!node.flowElements) return;

      const elements = node.flowElements.filter(
        (element) => element.$type !== "bpmn:SequenceFlow"
      );

      const numberOfElements = elements.length;

      if (numberOfElements > MAX_NUMBER_OF_ELEMENTS) {
        reporter.report(
          node.id,
          `Process should not have more than ${MAX_NUMBER_OF_ELEMENTS} elements.`
        );
      }
    }
  }

  return {
    check: check,
  };
};
