export function getHelpReply(): string {
  const commands = [
    `- ${code("чё каво")} (${code("/activity")}) — выводит статус парсеров-распиздяев`,
    `- ${code("спасите")} (${code("/help")}) — выводит помощь (документацию)`,
  ];
  const title = b("Я вас категорически приветствую.\nВот доступные команды:");
  return `${title}\n${commands.join("\n")}`;
}

function code(content: string): string {
  return `<code>${content}</code>`;
}

function b(content: string): string {
  return `<b>${content}</b>`;
}
