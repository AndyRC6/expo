// Copyright 2015-present 650 Industries. All rights reserved.

@objc
public protocol DevMenuDelegateProtocol {
  /**
   Returns a pointer to the bridge of the currently shown app. It is a context of what the dev menu displays.
   */
  @objc
  optional func appBridge(forDevMenuManager manager: DevMenuManager) -> AnyObject?

  /**
   Returns a dictionary with the most important informations about the current app.
   */
  @objc
  optional func appInfo(forDevMenuManager manager: DevMenuManager) -> [String : Any]?

  /**
   Tells the manager whether it can change dev menu visibility. In some circumstances you may want not to show/close the dev menu. (Optional)
   */
  @objc
  optional func devMenuManager(_ manager: DevMenuManager, canChangeVisibility visible: Bool) -> Bool

  /**
   Called just before dispatching an action. The delegate can return `false` to prevent an action from being dispatched or `true` otherwise.
   */
  @objc
  optional func devMenuManager(_ manager: DevMenuManager, willDispatchAction action: DevMenuAction) -> Bool

  /**
   Returns bool value whether the dev menu should show the onboarding view when it opens up.
   Default implementation returns true until the user gets it finished.
   */
  @objc
  optional func shouldShowOnboarding(manager: DevMenuManager) -> Bool

  /**
   Tells the manager which user interface style to use.
   */
  @available(iOS 12.0, *)
  @objc
  optional func userInterfaceStyle(forDevMenuManager manager: DevMenuManager) -> UIUserInterfaceStyle
}
