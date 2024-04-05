export const formatDayMonthYear = (data: Date, localidade: string): string => {
    const dateOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    };

    const formatter = new Intl.DateTimeFormat(localidade.replace('BR', 'pt-BR').replace('US', 'en-US'), dateOptions);

    return formatter.format(data);
  }
