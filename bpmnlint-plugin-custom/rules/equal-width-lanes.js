const { is, isAny } = require("bpmnlint-utils");

const lanesAreAligned = function (lanesList) {
  let aligned = true;
  let sameWidth = true;

  for (let i = 0; i < lanesList.length - 1; i++) {
    const x = lanesList[i];
    const y = lanesList[i + 1];

    if (x.bounds.x !== y.bounds.x) aligned = false;

    if (x.bounds.width !== y.bounds.width) sameWidth = false;
  }

  return aligned && sameWidth;
};

/**
 * Rule that reports manual tasks being used.
 */
module.exports = function () {
  function check(node, reporter) {
    // console.log("node", node);

    if (is(node, "bpmn:Definitions")) {
      const {
        plane: { planeElement },
      } = node.diagrams[0];

      const participants = planeElement.filter(
        (el) => el.bpmnElement.$type === "bpmn:Participant"
      );

      console.log(participants);

      if (!lanesAreAligned(participants)) {
        reporter.report(node.id, "Lanes are not aligned");
      }
    }
  }

  return {
    check: check,
  };
};
