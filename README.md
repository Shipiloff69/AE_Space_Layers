// Цей вираз призначений для текстового шару в After Effects, який копіює текст з csv-файлу, який імпортовано в проект.
// Вираз враховує наступні вимоги:
// - Копіювати увесь текст від "-Перш-" до "-Першкін-".
// - Розбивати текст на рядки по 73 символів, шукаючи пробіл після 66 символу або знак пунктуації після 73 символу.
// - Видалити пробіли на початку кожного рядка.
// - Замінити символ € на кому.

// Отримати текст з csv-файлу
var csv = footage("data.csv").sourceText; // звернутися до csv-файлу за назвою "data.csv", який має бути в проекті
// Знайти текст між "-Перш-" і "-Першкін-"
var start = csv.indexOf("-Перш-") + 6; // знайти позицію "-Перш-" в csv-файлі і додати 6, щоб пропустити цей маркер
var end = csv.indexOf("-Першкін-"); // знайти позицію "-Першкін-" в csv-файлі
var text = csv.substring(start, end); // вирізати текст між цими позиціями
// Видалити пробіли на початку кожного рядка
text = text.replace(/^\s+/gm, ""); // використати регулярний вираз, щоб знайти і видалити пробіли, які стоять на початку кожного рядка
// Розбити текст на рядки по 73 символів, шукаючи пробіл після 66 символу або знак пунктуації після 73 символу
var lines = []; // створити порожній масив для зберігання рядків
var lineLength = 73; // встановити довжину рядка в 73 символи
var breakPoint = 66; // встановити точку переносу в 66 символів
var punctuation = ".,!?"; // встановити знаки пунктуації, які можуть бути використані для переносу
var i = 0; // встановити лічильник для перебору символів в тексті
while (i < text.length) { // поки не досягнуто кінця тексту
  var j = text.indexOf(" ", breakPoint + i); // знайти пробіл між breakPoint і lineLength
  var k = punctuation.indexOf(text.charAt(lineLength + i)); // знайти знак пунктуації після lineLength
  if (j > 0 && j < lineLength + i) { // якщо пробіл існує і не перевищує lineLength
    lines.push(text.substring(i, j)); // додати рядок до lineLength з пробілом
    i = j + 1; // перейти до наступного рядка після пробілу
  } else if (k >= 0) { // якщо знак пунктуації існує після lineLength
    lines.push(text.substring(i, i + lineLength + 1)); // додати рядок до lineLength + 1 з знаком пунктуації
    i += lineLength + 1; // перейти до наступного рядка після знака пунктуації
  } else { // якщо пробілу або знака пунктуації немає або вони перевищують lineLength
    lines.push(text.substring(i, i + lineLength)); // додати рядок до lineLength без пробілу або знака пунктуації
    i += lineLength; // перейти до наступного рядка
  }
}
// Об'єднати рядки з символом нового рядка
text = lines.join("\n"); // використати символ нового рядка, щоб об'єднати рядки в один текст
// Повернути текст
text // повернути текст як результат виразу
