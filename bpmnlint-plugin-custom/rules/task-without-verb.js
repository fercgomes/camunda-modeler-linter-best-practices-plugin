const { is, isAny } = require("bpmnlint-utils");

/**
 * Rule that reports manual tasks being used.
 */
module.exports = function () {
  function check(node, reporter) {
    if (isAny(node, ["bpmn:Task"])) {
      // Simple workaround
      // TODO: actual NLP analysis

      if (node.name) {
        const splits = node.name.split(" ");
        const firstWord = splits[0];
        const lastLetter = firstWord.slice(-1);

        if (!["r", "R"].includes(lastLetter)) {
          reporter.report(node.id, "Task name must start with a verb.");
        }
      }
    }
  }

  return {
    check: check,
  };
};
