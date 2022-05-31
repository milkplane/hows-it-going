# How's it going (Pathfinder generator)

Вы потеряли свой огромный сундук с золотом? Возможно вы задаетесь вопросом, как вам добраться до него. <br />
Существует множество путей по которым можно пойти, но какие из них ведут к сокровищу.<br />
Какой путь самый короткий? <br />

В этом приложение вы можете построить именно тот путь, который считаете лучшим. <br />
Доступно по ссылке: https://milkplane.github.io/hows-it-going/ <br />

## Жадность

Основной параметр поиска - жадность. <br />
Чем больше жадность, тем меньше поиск учитывает рельеф поверхности. <br />
Определенные значения жадности соответствуют некоторым известным алгоритмам. <br />
- **Алгоритм Дейкстры** - 0 <br />
- **A*** - 0.5 <br />
- **Жадный первый - лучший** - 1 <br />

## Инструменты 

Не все же бродить по однообразным лабиринтам. <br />
Как начет гор или бескрайних(в пределах монитора) просторов, чья густая зелень питается близлежащей рекой?
С помощью инструментов вы сможете создать пейзаж, сравнимый с работами художников прошлого, столь же нетронутая природа, вызывающая благоговение.

- **Куст** - непроходимая стена
- **Вода** - алгоритм любит избегать ее
- **Увеличить высоту**
- **Уменьшить высоту**
