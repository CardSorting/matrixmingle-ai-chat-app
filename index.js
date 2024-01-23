import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import { StyleSheet, ActivityIndicator, View, Text } from 'react-native';

class MyWebView extends Component {
  state = {
    isLoading: true,
    hasError: false,
    errorMessage: ''
  };

  handleLoad = () => {
    this.setState({ isLoading: false });
  };

  handleError = (syntheticEvent) => {
    const { nativeEvent } = syntheticEvent;
    this.setState({ isLoading: false, hasError: true, errorMessage: nativeEvent.description });
  };

  renderLoadingIndicator = () => {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  };

  renderError = () => {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error Loading Page</Text>
        <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
      </View>
    );
  };

  render() {
    if (this.state.hasError) {
      return this.renderError();
    }

    return (
      <WebView
        source={{ uri: 'https://www.matrixmingle.com' }}
        style={styles.webview}
        onLoad={this.handleLoad}
        onError={this.handleError}
        renderLoading={this.renderLoadingIndicator}
        startInLoadingState={true}
      />
    );
  }
}

const styles = StyleSheet.create({
  webview: {
    flex: 1
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  errorText: {
    fontSize: 18,
    marginBottom: 10
  },
  errorMessage: {
    fontSize: 14,
    textAlign: 'center'
  }
});

export default MyWebView;