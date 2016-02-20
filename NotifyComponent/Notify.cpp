#include "Hstring.h"
#include "Notify.h"


using namespace NotifyComponent;
using namespace Platform;
using namespace std;
using namespace Windows::UI::Core;

Notify::Notify() {
	m_dispatcher = Windows::UI::Core::CoreWindow::GetForCurrentThread()->Dispatcher;
}

int x = 0;

int Notify::getNum() {
	return(x);
}

void Notify::setNum(int n) {
	x = n;
}

void Notify::stringNotify(String^ s)
{
	m_dispatcher->RunAsync(
		CoreDispatcherPriority::Normal,
		ref new DispatchedHandler([this, s]
	{
		NotifyAppEvent(s);
	}));
}