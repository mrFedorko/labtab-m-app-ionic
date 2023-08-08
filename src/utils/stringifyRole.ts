
export const stringifyRole = (type = '') => {
    switch (type) {
        case 'user':
            return 'Пользователь';
        case 'prep':
            return 'Препаратор';
        case 'head':
            return 'Начальник';
        case 'admin':
            return 'Администратор';
        case 'developer':
            return 'Разработчик';
        default:
            return ''
    }
}