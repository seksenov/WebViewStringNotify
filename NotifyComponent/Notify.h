#pragma once

namespace NotifyComponent
{
	public delegate void NotifyAppHandler(Platform::String^ message);

	[Windows::Foundation::Metadata::AllowForWebAttribute]
	public ref class Notify sealed
	{
	public:
		Notify();
		int getNum();
		void setNum(int n);
		event NotifyAppHandler^ NotifyAppEvent;
		void stringNotify(Platform::String^ s);

	private:
		Windows::UI::Core::CoreDispatcher^ m_dispatcher;
	};


}