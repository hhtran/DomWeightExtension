function percentageToHsl(percentage, hue0, hue1) {
  var hue = percentage * (hue1 - hue0) + hue0;
  return "hsl(" + hue + ", 50%, 50%)";
}

function domNodeCount(node, executeOnNode) {
  if (!node) {
    return 0;
  }
  const count = [...node.children].reduce((acc, cur) => {
    const count = acc + domNodeCount(cur, executeOnNode);
    executeOnNode && executeOnNode(cur, count);
    return count;
  }, 0);
  return count + 1;
}

function colorForCount(count) {
  return percentageToHsl(count / 100, 120, 0);
}

domNodeCount(document.body, (node, count) => {
  node.style.backgroundColor = colorForCount(count);
});

console.log("WEEE");

alert("hello");
