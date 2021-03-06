
class EventManager {
    constructor() {
        this.urlBase = "users"
        this.obtenerDataInicial()
        this.inicializarFormulario()
        this.guardarEvento()
    }

    obtenerDataInicial() {
        let url = this.urlBase + "/all"
        console.log('obtenerDataInicial')
        $.get(url, (response) => {
            this.inicializarCalendario(response)
        })
    }
    actualizarEvento(evento) {
      console.log("vamos a actualizar el evento app.js "+evento)
        let eventId = evento.title
        var start = moment(evento.start).format('YYYY-MM-DD HH:mm:00');
        var end = moment(evento.end).format('YYYY-MM-DD HH:mm:00');
        /*let ev = {
            title: evento.title,
            start: start,
            end: end
        }*/
        let title = evento.title
        let starta = start
        let enda = end
        console.log( title)
        console.log( starta)
        console.log( enda)
        $.post('/users/actualizar_evento', { starta,title, enda} , (response) => {
            alert(response)
            location.reload();

        })
    }

    eliminarEvento(evento) {
        let eventId = evento.title
        console.log(eventId)
        $.post('/users/eliminar_evento',  { eventId }, (response) => {
            alert(response)
            location.reload();

        })
    }

    guardarEvento() {
        $('.addButton').on('click', (ev) => {
            ev.preventDefault()
            let nombre = $('#titulo').val(),
            start = $('#start_date').val(),
            title = $('#titulo').val(),
            end = '',
            start_hour = '',
            end_hour = '';

            if (!$('#allDay').is(':checked')) {
                end = $('#end_date').val()
                start_hour = $('#start_hour').val()
                end_hour = $('#end_hour').val()
                start = start + 'T' + start_hour
                end = end + 'T' + end_hour
            }
            let url = this.urlBase + "/agregar_evento"
            if (title != "" && start != "") {
                let ev = {
                    title: title,
                    start: start,
                    end: end
                }

                $.post(url, ev, (response) => {
                    alert(response)
                    console.log(ev)
                })
                $('.calendario').fullCalendar('renderEvent', ev)
            } else {
                alert("Complete los campos obligatorios para el evento")
            }
        })
    }

    inicializarFormulario() {
        $('#start_date, #titulo, #end_date').val('');
        $('#start_date, #end_date').datepicker({
            dateFormat: "yy-mm-dd"
        });
        $('.timepicker').timepicker({
            timeFormat: 'HH:mm:ss',
            interval: 30,
            minTime: '5',
            maxTime: '23:59:59',
            defaultTime: '',
            startTime: '5:00',
            dynamic: false,
            dropdown: true,
            scrollbar: true
        });
        $('#allDay').on('change', function(){
            if (this.checked) {
                $('.timepicker, #end_date').attr("disabled", "disabled")
            }else {
                $('.timepicker, #end_date').removeAttr("disabled")
            }
        })
    }

    inicializarCalendario(eventos) {
      console.log('inicializamos el calendario')
        $('.calendario').fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,basicDay'
            },
            defaultDate: '2016-11-01',
            navLinks: true,
            editable: true,
            eventLimit: true,
            droppable: true,
            dragRevertDuration: 0,
            timeFormat: 'H:mm',
            eventDrop: (event) => {
                this.actualizarEvento(event)
                console.log(event.title)
            },
            events: {
              url: 'users/cargar_eventos',
              error: function() {
                $('#script-warning').show();
              }
            },
            eventDragStart: (event,jsEvent) => {
                $('.delete').find('img').attr('src', "img/delete.png");
                $('.delete').css('background-color', '#a70f19')
            },
            eventDragStop: (event,jsEvent) => {
                var trashEl = $('.delete');
                var ofs = trashEl.offset();
                var x1 = ofs.left;
                var x2 = ofs.left + trashEl.outerWidth(true);
                var y1 = ofs.top;
                var y2 = ofs.top + trashEl.outerHeight(true);
                if (jsEvent.pageX >= x1 && jsEvent.pageX<= x2 &&
                    jsEvent.pageY >= y1 && jsEvent.pageY <= y2) {
                        console.log(event)
                        this.eliminarEvento(event)
                        $('.calendario').fullCalendar('removeEvents', event.title);
                    }
                }
            })
        }
    }

    const Manager = new EventManager()
