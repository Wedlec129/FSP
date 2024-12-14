

//ConvertData("2024-09-27T18:24:49.000Z") => 27 сентября в 21:24
export default function ConvertData(data){
    const time = new Date(data);
    // Преобразуем время в форматированную строку
    return time.toLocaleTimeString('ru-RU', {day: "2-digit", month: 'long', hour: '2-digit', minute: '2-digit'});

}


