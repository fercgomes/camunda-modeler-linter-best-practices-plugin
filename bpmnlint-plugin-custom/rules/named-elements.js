const { is, isAny } = require("bpmnlint-utils");

/**
 * Elements must be named
 */
module.exports = function () {
  function check(node, reporter) {
    if (isAny(node, ["bpmn:Task", "bpmn:Event", "bpmn:Participant"])) {
      if (!node.name) {
        reporter.report(node.id, "Element must have a name.");
      }
    }
  }

  return {
    check: check,
  };
};
