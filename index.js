const line1 = document.querySelector("#line1");
const line2 = document.querySelector("#line2");
const taskBtn = document.querySelector("#taskBtn");
const answerItems = document.querySelectorAll(".answer-item");

taskBtn.addEventListener("click", () => {
  const ansArray = stepsToConvert(line1.value.trim(), line2.value.trim());
  answerItems.forEach(
    (answerItem, index) =>
      (answerItem.querySelector("span").innerHTML = ansArray[index])
  );
});

function stepsToConvert(line1, line2) {
  let offset = 0,
    steps = 0,
    ans1 = "",
    ans2 = "",
    i = -1;
  const diff = line2.length - line1.length;
  diff < 0 ? ([line1, line2] = [line2, line1]) : null;
  while (ans1.length < line2.length && i < line1.length - 1) {
    i++;
    if (line1[i] === line2[i + offset]) {
      ans1 += line1[i];
      ans2 += line2[i + offset];
      continue;
    } // Equal
    if (line1[i + 1] === line2[i + offset]) {
      ans1 += line1[i];
      ans2 += "-";
      steps++;
      offset--;
    } // Delete
    else {
      let j = ans1.length + offset;
      let changed = false;
      for (j; j < line2.length; j++) {
        if (line1[i] === line2[i + 1 + j]) {
          for (let k = 0; k <= j; k++) {
            ans1 += "-";
            steps++;
          }
          ans1 += line1[i];
          ans2 += line2.slice(ans2.length, ans2.length + j + 2);
          changed = true;
          break;
        }
      }
      // Insert
      if (changed == false) {
        ans1 += line1[i];
        ans2 += line2[i + offset];
        steps++;
        // Different
      } else {
        offset = j + 1;
      }
    }
  }

  if ((offset > 0 ? ans1.length - offset : ans1.length) < line1.length) {
    ans1 += line1.slice(offset > 0 ? ans1.length - offset : ans1.length);
  }
  const lengthDiff = line2.length - ans1.length;

  for (let j = 0; j < (offset < 0 ? lengthDiff - offset : lengthDiff); j++) {
    ans1 += "-";
    steps++;
  }

  ans2 += line2.slice(offset < 0 ? ans2.length + offset : ans2.length);

  while (ans2.length < ans1.length) {
    ans2 += "-";
    steps++;
  }

  if (steps > line2.length) {
    [ans1, ans2, steps] = [line1, line2, line2.length];
    for (let i = 0; i < line2.length - line1.length; i++) {
      ans1 += "-";
    }
  }

  diff < 0 ? ([ans1, ans2] = [ans2, ans1]) : null;

  return [ans1, ans2, steps];
}
