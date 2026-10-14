package com.getcapacitor.community.applepay;

import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin
public class ApplePay extends Plugin {

    @PluginMethod
    public void canMakePayments(PluginCall call) {
        call.reject("Apple Pay is not available on Android.");
    }

    @PluginMethod
    public void makePaymentRequest(PluginCall call) {
        call.reject("Apple Pay is not available on Android.");
    }
}
