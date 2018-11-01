const defaultImg = {
  base64: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjM2cHgiIGhlaWdodD0iMzZweCIgdmlld0JveD0iMCAwIDM2IDM2IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnNrZXRjaD0iaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoL25zIj4KICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy4zLjMgKDEyMDgxKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5kZWZhdWx0X2dyYXZhdGFyPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+PC9kZWZzPgogICAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc2tldGNoOnR5cGU9Ik1TUGFnZSI+CiAgICAgICAgPGcgaWQ9ImRlZmF1bHRfZ3JhdmF0YXIiIHNrZXRjaDp0eXBlPSJNU0FydGJvYXJkR3JvdXAiPgogICAgICAgICAgICA8ZyBpZD0iUmVjdGFuZ2xlLTIxMC0rLUltcG9ydGVkLUxheWVycy1Db3B5LUNvcHkiIHNrZXRjaDp0eXBlPSJNU0xheWVyR3JvdXAiPgogICAgICAgICAgICAgICAgPHJlY3QgaWQ9IlJlY3RhbmdsZS0yMTAiIGZpbGw9IiNEOEQ4RDgiIHNrZXRjaDp0eXBlPSJNU1NoYXBlR3JvdXAiIHg9IjAiIHk9IjAiIHdpZHRoPSIzNiIgaGVpZ2h0PSIzNiI+PC9yZWN0PgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTI3Ljg2OTAzMjEsMjYuODUzNjU2OCBMOCwyNi44NTM2NTY4IEM4LDI1Ljg0OTQ1MTQgOC40NzE4MjUsMjQuMTEwOTQ2NiAxMS41MTg5MDQ1LDIyLjM4ODMxNzYgQzEyLjE1Nzg5NiwyMi4wMjcxMjEzIDE1LjM0Mzk1MTIsMjAuMDk2MTA5OCAxNS42MTU5Njc3LDE5LjYzNzE3MjEgQzE1LjkyNDU4MjgsMTkuMTE3MjA4MSAxNi4wMTA2Mzg5LDE4LjQ3NjE4MzcgMTUuNDIwMTE1OCwxNy41MzI1MDg1IEMxNS4zNzI2MzY2LDE3LjQ1NjEwMTYgMTQuNDM0OTIxNSwxNi4wMDgzMzkxIDE0LjE0NTEwMDMsMTUuMDMwNDI5NyBDMTMuOTQwMzQ2LDE0LjMzODMwMiAxMy45MTc1OTU1LDEzLjU0NTQ1NjEgMTMuOTE3NTk1NSwxMi43MTM0MTQ0IEMxMy45MTc1OTU1LDkuODM2MjQ3MDIgMTUuNzIyMzAxNCw4IDE3Ljk0ODM4NTYsOCBDMjAuMTc0NDY5OSw4IDIxLjk3OTE3NTgsOS44MzYyNDcwMiAyMS45NzkxNzU4LDEyLjcxMzQxNDQgQzIxLjk3OTE3NTgsMTMuMzk5MDkyMiAyMS45NjYzMTY4LDE0LjA1NTk5MzMgMjEuODQ3MTI0MSwxNC42NTM4NTI3IEMyMS42Mzk4OTcsMTUuNjkwMzA3NyAyMC43NzU4NzM2LDE3LjAwNTU5ODQgMjAuNTg4NDI5NSwxNy4zMzA1NzU5IEMyMC41NDM5MTc3LDE3LjQwNzQ3OSAyMC41MDc4MTM3LDE3LjQ2NzUxMyAyMC40ODUwNjMzLDE3LjUwMTI1MTEgQzIwLjA3OTAxNjgsMTguMTA3MDQ4OSAxOS45NjI3OTE2LDE4LjU1MzU4MjkgMjAuMDAwODczOSwxOC45MTUyNzU1IEMyMC4wNDQzOTY1LDE5LjMyODU2NzUgMjAuMzEzOTQwMSwxOS42MTYzMzM4IDIwLjY2NzA2NywxOS44NTQ0ODUzIEMyMS4wMzQ1MzY2LDIwLjEwMjA2MzYgMjQuMDExODgxLDIyLjE0OTY3IDI0LjM3Nzg2NjgsMjIuMzg4MzE3NiBDMjYuODcxNTE2MywyNC4wMTY2NzgzIDI3Ljg2OTAzMjEsMjUuNjA2MzM4NSAyNy44NjkwMzIxLDI2Ljg1MzY1NjggTDI3Ljg2OTAzMjEsMjYuODUzNjU2OCBaIiBpZD0iSW1wb3J0ZWQtTGF5ZXJzLUNvcHkiIGZpbGw9IiNGRkZGRkYiIHNrZXRjaDp0eXBlPSJNU1NoYXBlR3JvdXAiPjwvcGF0aD4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+'
}

export {
  defaultImg
}